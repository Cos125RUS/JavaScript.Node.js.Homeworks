const generate = (size = 20) => {
    const chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^&*?~`"<>\\|/';
    let pass = '';
    for (let index = 0; index < size; index++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }
    return pass;
}

module.exports = { generate };