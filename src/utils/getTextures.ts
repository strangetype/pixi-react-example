export const getTextures = (textures: any, asTextureChain: any) => {
    return asTextureChain
        ? Object.keys(textures).map((k) => textures[k])
        : textures;
}
