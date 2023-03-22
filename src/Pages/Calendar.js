import AsyncStorage from '@react-native-async-storage/async-storage'
import {format, getMonth, getDate, differenceInDays, add, isBefore, addDays} from 'date-fns'
import {useEffect, useState} from 'react'
import {Text, View} from 'react-native'
import styled from 'styled-components/native'

const Total = styled.SafeAreaView`
    background-color: #f1d5d4;
    flex: 1;
`

const Contents = styled.View`
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 90px;
`
const Top = styled.Text`
    color: #294747;
    font-weight: 700;
    font-size: 40px;
`

const Btn = styled.TouchableOpacity`
    width: 100%;
    height: 61px;
    background: #294747;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin-top: 18px;
`

const BtnText = styled.Text`
    color: #ffffff;
    font-weight: 400;
    font-size: 24px;
`

const Block = styled.View`
    width: 100%;
    height: 46px;
`

const Middle = styled.Text`
    color: #294747;
    font-weight: 700;
    font-size: 30px;
    margin-top: 18px;
`

function Calendar({navigation}) {
    let date = new Date()
    const nowMonth = getMonth(date)
    const nowDay = getDate(date)
    const [periodDuration, setPeriodDuration] = useState(null)
    const [expectation, setExpectation] = useState()
    const [mostRecent, setMostRecent] = useState()

    useEffect(() => {
        const getPeriodData = async () => {
            try {
                const storageData = JSON.parse(await AsyncStorage.getItem('periodData'))
                const durationData = JSON.parse(await AsyncStorage.getItem('durationData'))
                if (storageData.length >= 2) {
                    // console.log('hey get the data! ', storageData)
                    // console.log('my duration is : ', durationData)
                    const {date: date1, month: month1, year: year1} = storageData[0]
                    const {date: date2, month: month2, year: year2} = storageData[1]
                    const recentData = new Date(`${year1}-${month1}-${date1}`)
                    const recentData2 = new Date(`${year2}-${month2}-${date2}`)
                    setMostRecent(recentData)
                    setPeriodDuration(durationData)
                    setExpectation(addDays(recentData, differenceInDays(recentData, recentData2)))
                }
            } catch (e) {
                console.log(e)
            }
        }
        getPeriodData()
    }, [])
    // console.log('가장 최근 생리 : ', mostRecent)
    // console.log('today : ', date)
    // console.log('생리 기간 : ', periodDuration)
    // console.log('예상 다음 생리 날짜 : ', expectation)
    // console.log('날짜 차이 : ', differenceInDays(mostRecent, date))

    return (
        <Total>
            <Contents>
                <Top>
                    {nowMonth + 1}월 {nowDay}일, 오늘
                </Top>
                {differenceInDays(mostRecent, date) >= periodDuration && <Top>월경을 시작했군요. 힘들면 말해요.</Top>}
                {differenceInDays(mostRecent, date) < periodDuration && isBefore(date, expectation) && (
                    <Top>예상 월경 시작일이 {differenceInDays(expectation, date)}일 남았어요.</Top>
                )}

                {differenceInDays(mostRecent, date) < periodDuration && isBefore(expectation, date) && (
                    <Top>예상 월경 시작일이 {differenceInDays(date, expectation)}일 지났어요.</Top>
                )}

                <Top></Top>
                <Middle>곧 월경이 시작될 거에요.</Middle>
                <Block />
                <Btn
                    onPress={() => {
                        navigation.push('New')
                    }}
                >
                    <BtnText>월경일 등록</BtnText>
                </Btn>
                <Btn
                    onPress={() => {
                        navigation.push('ChangePick')
                    }}
                >
                    <BtnText>월경일 편집</BtnText>
                </Btn>
                <Btn>
                    <BtnText>증상, 기분 기록 추가</BtnText>
                </Btn>
                <Btn>
                    <BtnText>성생활 기록 추가</BtnText>
                </Btn>
            </Contents>
        </Total>
    )
}

export default Calendar
