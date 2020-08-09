import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import api from '../../services/api';

function TeacherList() {
    const [favorites, setFavorites] = useState<number[]>([])
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    
    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((element: Teacher) => {
                    return element.id;
                });
                setFavorites(favoritedTeachersIds);
            }
        });
    }

    useEffect(() => {
        loadFavorites();
    }, []);

    async function handleFilterSubmit() {
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
        loadFavorites();
        setIsFilterVisible(false);
    }

    function handleToggleFiltersVisible() {
        setIsFilterVisible(!isFilterVisible);
    }    

    useEffect(() => {
        handleFilterSubmit();
    }, [])

    if(!(teachers.length > 0) && teachers !== undefined)
        return (
            <View style={styles.container}>
                <PageHeader 
                    title="Proffys disponíveis" 
                    headerRight={(
                        <BorderlessButton onPress={handleToggleFiltersVisible}>
                            <Feather name='filter' size={20} color='#FFF' />
                        </BorderlessButton>
                    )}
                ></PageHeader>

                <View style={styles.loadingContainer}>
                    <Text style={styles.textLoading}>
                        Não há proffys disponíveis :(
                    </Text>
                </View>
            </ View>
        )
    else
        return (
            <View style={styles.container}>
                <PageHeader 
                    title="Proffys disponíveis" 
                    headerRight={(
                        <BorderlessButton onPress={handleToggleFiltersVisible}>
                            <Feather name='filter' size={20} color='#FFF' />
                        </BorderlessButton>
                    )}
                >
                    { isFilterVisible && (
                        <View style={styles.searchForm}>
                            <Text style={styles.label}>Matéria</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Qual a matéria?'
                                placeholderTextColor='#C1BCCC'
                                onChangeText={text => 
                                    setSubject(text)
                                }
                                value={subject}
                            />

                            <View style={styles.inputGroup}>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Dia da semana</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Qual o dia?'
                                        placeholderTextColor='#C1BCCC'
                                        onChangeText={text => 
                                            setWeekDay(text)
                                        }
                                        value={week_day}
                                    />
                                </View>

                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Horário</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Qual o horário?'
                                        placeholderTextColor='#C1BCCC'
                                        onChangeText={text => 
                                            setTime(text)
                                        }
                                        value={time}
                                    />
                                </View>
                            </View>

                            <RectButton onPress={handleFilterSubmit} style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>Filtrar</Text>
                            </RectButton>
                        </View>
                    )}
                </PageHeader>
                
                <ScrollView
                    style={styles.teacherList}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingBottom: 16
                    }}
                >
                    {
                        teachers.map((teacher: Teacher) => {
                            return <TeacherItem 
                                key={teacher.id} 
                                teacher={teacher}
                                favorited={favorites.includes(teacher.id)}
                            />;
                        })
                    }
                </ScrollView>
            </View>
        );
}

export default TeacherList;