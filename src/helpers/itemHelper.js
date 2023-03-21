export const randomizeColor = () =>
    `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})` ;

export const randomizeDimension = () => Math.floor(Math.random() * 30 + 40);
