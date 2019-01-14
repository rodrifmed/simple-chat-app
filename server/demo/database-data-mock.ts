export const USERS: { [key: number]: any } = {
    1: {
        id: 1,
        email: 'c1@gmail.com',
        password: '123456',
        role: 'CANDIDATE',
        wallet:"w1"
    },
    2: {
        id: 2,
        email: 'c2@gmail.com',
        password: '123456',
        role: 'CANDIDATE',
        wallet:"w2"
    },
    3: {
        id: 3,
        email: 'c3@gmail.com',
        password: '123456',
        role: 'CANDIDATE',
        wallet:"w3"
    },
    4: {
        id: 4,
        email: 'c4@gmail.com',
        password: '123456',
        role: 'CANDIDATE',
        wallet:"w4"
    },
    5: {
        id: 5,
        email: 'r1@gmail.com',
        password: '123456',
        role: 'RECRUITER',
        wallet:"w5"
    },
    6: {
        id: 6,
        email: 'r2@gmail.com',
        password: '123456',
        role: 'RECRUITER',
        wallet:"w6"
    },
};

export let CHATS: { [key: string]: any } = {
    "chat1": {
        "title": "Title1",
        "timestamp": 1459361875666
    },
    "chat2": {
        "title": "Title2",
        "timestamp": 1459361875655
    },
    "chat3": {
        "title": "Title3",
        "timestamp": 1459361875655
    },
    "chat4": {
        "title": "Title4",
        "timestamp": 1459361875655
    }
};

export let USERS_PER_CHAT: { [key: string]: any } = {
    "chat1": {
        5: true,
        2: true
    },
    "chat2": {
        5: true,
        3: true
    }
}

export let CHATS_PER_USER: { [key: number]: any } = {
    5: {
        "chat1": true,
        "chat2": true
    },
    2: {
        "chat1": true
    },
    3: {
        "chat2": true
    }
};

export let MESSAGES_PER_CHAT: { [key: string]: any } = {
    "chat1": {
        "m1": {
            "id": "m1",
            "chatId": "chat1",
            "name": "r1@gmail.com",
            "message": "Hello, how are you?",
            "timestamp": 1459361875337
        },
        "m2": {
            "id": "m2",
            "chatId": "chat1",
            "name": "c1@gmail.com",
            "message": "I'm good, and you?",
            "timestamp": 1459361875337
        }
    }
}

export let WALLET: { [key: string]: any } = {
    "w1": {
        "value": 10
    },
    "w2": {
        "value": 10
    },
    "w3": {
        "value": 10
    },
    "w4": {
        "value": 10
    },
    "w5": {
        "value": 10
    },
    "w6": {
        "value": 10
    },
    "wvitay": {
        "value": 10
    }
}