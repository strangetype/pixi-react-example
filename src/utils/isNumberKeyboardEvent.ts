export const isNumberKeyboardEvent = (evt) => {
    evt = (evt) || window.event;
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    const charCodeNumber = [8, 12, 13, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 190];
    return charCodeNumber.includes(charCode);
};
