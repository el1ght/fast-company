import {professionsObject as professions} from './professions.api';
const qualities = {
    tedious: {
        _id: '67rdca3eeb7f6fgeed471198',
        name: 'Нудила',
        color: 'primary'
    },
    strange: {
        _id: '67rdca3eeb7f6fgeed471100',
        name: 'Странный',
        color: 'secondary'
    },
    buller: {
        _id: '67rdca3eeb7f6fgeed4711012',
        name: 'Троль',
        color: 'success'
    },
    alcoholic: {
        _id: '67rdca3eeb7f6fgeed471101',
        name: 'Алкоголик',
        color: 'danger'
    },
    handsome: {
        _id: '67rdca3eeb7f6fgeed471102',
        name: 'Красавчик',
        color: 'info'
    },
    uncertain: {
        _id: '67rdca3eeb7f6fgeed471103',
        name: 'Неуверенный',
        color: 'dark'
    }
};

const users = [
    {
        _id: '67rdca3eeb7f6fgeed471815',
        name: 'Джон Дориан',
        email: 'johndorian@fastcompany.ru',
        sex: 'male',
        profession: professions.doctor,
        qualities: [qualities.tedious, qualities.uncertain, qualities.strange],
        completedMeetings: 36,
        rate: 2.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471816',
        name: 'Кокс',
        email: 'koks@fastcompany.ru',
        sex: 'male',
        profession: professions.doctor,
        qualities: [qualities.buller, qualities.handsome, qualities.alcoholic],
        completedMeetings: 15,
        rate: 2.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471817',
        name: 'Боб Келсо',
        email: 'bobkelso@fastcompany.ru',
        sex: 'male',
        profession: professions.doctor,
        qualities: [qualities.buller],
        completedMeetings: 247,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471818',
        name: 'Рэйчел Грин',
        email: 'rachelgreene@fastcompany.ru',
        sex: 'female',
        profession: professions.waiter,
        qualities: [qualities.uncertain],
        completedMeetings: 148,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471819',
        name: 'Шелдон Купер',
        email: 'sheldoncooper@fastcompany.ru',
        sex: 'male',
        profession: professions.physics,
        qualities: [qualities.strange, qualities.tedious],
        completedMeetings: 37,
        rate: 4.6,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471820',
        name: 'Леонард Хофстедтер',
        email: 'leonardhofstedter@fastcompany.ru',
        sex: 'male',
        profession: professions.physics,
        qualities: [qualities.strange, qualities.uncertain],
        completedMeetings: 147,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471821',
        name: 'Говард Воловиц',
        email: 'howardwolowitz@fastcompany.ru',
        sex: 'male',
        profession: professions.engineer,
        qualities: [qualities.strange, qualities.tedious],
        completedMeetings: 72,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471822',
        name: 'Никола Тесла',
        email: 'nikolatesla@fastcompany.ru',
        sex: 'male',
        profession: professions.engineer,
        qualities: [qualities.handsome],
        completedMeetings: 72,
        rate: 5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471823',
        name: 'Моника Геллер',
        email: 'monicageller@fastcompany.ru',
        sex: 'female',
        profession: professions.cook,
        qualities: [qualities.strange, qualities.uncertain],
        completedMeetings: 17,
        rate: 4.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed471824',
        name: 'Рататуй',
        email: 'ratatouille@fastcompany.ru',
        sex: 'male',
        profession: professions.cook,
        qualities: [qualities.handsome, qualities.buller],
        completedMeetings: 17,
        rate: 4.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed47181f',
        name: 'Джоуи Триббиани',
        email: 'joeytribbiani@fastcompany.ru',
        sex: 'male',
        profession: professions.actor,
        qualities: [qualities.uncertain, qualities.strange],
        completedMeetings: 434,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: '67rdca3eeb7f6fgeed47181r',
        name: 'Брэд Питт',
        email: 'bradpitt@fastcompany.ru',
        sex: 'male',
        profession: professions.actor,
        qualities: [qualities.handsome],
        completedMeetings: 434,
        rate: 5,
        bookmark: false
    }
];
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
}

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function() {
            resolve(JSON.parse(localStorage.getItem('users')));
        }, 2000);
    });
const update = (id, data) =>
    new Promise((resolve) => {
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex((u) => u._id === id);
        users[userIndex] = {...users[userIndex], ...data};
        localStorage.setItem('users', JSON.stringify(users));
        resolve(users[userIndex]);
    });

const getById = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function() {
            resolve(
                JSON.parse(localStorage.getItem('users')).find(
                    (user) => user._id === id
                )
            );
        }, 1000);
    });
export default {
    fetchAll,
    getById,
    update
};
