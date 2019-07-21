export const validUsername = str =>{
    const valid_map = ['admin'];
    return valid_map.indexOf(str.trim()) >= 0;
}