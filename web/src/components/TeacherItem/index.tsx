import React, { ReactHTML, useEffect } from 'react'
import whatsAppIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css'
import api from '../../services/api'
import { convertMinuteToHoursString, whichDayIsIt } from '../../utils/timeConverter'
export interface Teacher {
    id: number,
    avatar: string,
    bio: string,
    cost: number,
    name: string,
    subject: string,
    whatsapp: string,
    WeekDays: string,
    From: string,
    To: string
}

interface Day {
    avaliable: boolean,
    week_day: number,
    from?: number,
    to?: number
}

export interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id
        });
    }

    const WeekDays = teacher.WeekDays.split(',').map(Number);
    const From = teacher.From.split(',').map(Number);
    const To = teacher.To.split(',').map(Number);
    let daysOfWeek: Day[] = [];


    for (let i = 0; i < 7; i++) {
        if (WeekDays.includes(i)) {
            let idx = WeekDays.indexOf(i);
            daysOfWeek.push({
                avaliable: true,
                week_day: i,
                from: From[idx],
                to: To[idx]
            })
        } else {
            daysOfWeek.push({
                avaliable: false,
                week_day: i,
            })
        }
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>
                {teacher.bio}
            </p>
            <div className="daysContainer">
                {
                    daysOfWeek.map((element) => {
                        return (
                            <div className="day" id={!element.avaliable ? 'unavaliable' : ''}>
                                <span>Dia</span>
                                <strong>{whichDayIsIt(element.week_day)}</strong>
                                <span>Hora</span>
                                <strong>{element.avaliable && convertMinuteToHoursString(element.from || 0)} - {element.avaliable && convertMinuteToHoursString(element.to || 0)}</strong>
                            </div>
                        )
                    })
                }
            </div>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a onClick={createNewConnection} target='_blank' href={`https://wa.me/${teacher.whatsapp}`}>
                    <img src={whatsAppIcon} alt="WhatsApp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;