function checkEmailOrUsername(input: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(input)) {
        return 'Email';
    } else {
        return 'Username';
    }
}

export default checkEmailOrUsername