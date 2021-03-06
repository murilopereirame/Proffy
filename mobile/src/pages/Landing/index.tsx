import React, { useEffect, useState } from 'react'
import { View, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import styles from './styles';
import landingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import hearthIcon from '../../assets/images/icons/heart.png'
import api from '../../services/api'
import { AppLoading } from 'expo';
function Landing() {
    const { navigate } = useNavigation();

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
            const {total} = response.data;
            setTotalConnections(total);
        })
    }, [])

    function handleNavigateToStudyPages() {
        navigate('Study');
    }

    function handleNavigateToGiveClassesPage() {
        navigate('GiveClasses');
    }

    if(!totalConnections) 
        return <AppLoading/>
    else
        return (
            <View style={styles.container}>
                <Image source={landingImage} style={styles.banner} />

                <Text style={styles.title}>
                    Seja bem-vindo, {'\n'}
                    <Text style={styles.titleBold}>O que deseja fazer?</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton 
                        onPress={handleNavigateToStudyPages} 
                        style={[styles.button, styles.buttonPrimary]}
                    >
                        <Image source={studyIcon}/>
                        <Text style={styles.buttonText}>Estudar</Text>
                    </RectButton>
                    <RectButton 
                        onPress={handleNavigateToGiveClassesPage} 
                        style={[styles.button, styles.buttonSecondary]}
                    >
                        <Image source={giveClassesIcon}/>
                        <Text style={styles.buttonText}>Dar aulas</Text>
                    </RectButton>
                </View>

                <Text style={styles.totalConnections}>
                    Total de {totalConnections} conexões já realizadas {' '}
                    <Image source={hearthIcon} />
                </Text>

            </View>
        );
}

export default Landing;
