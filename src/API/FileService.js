export default class FileService {
    static compressFileName = (fileName, numOfChars) => {
        return fileName.substr(0, Math.floor(numOfChars / 2)) + "..." + fileName.substr(-Math.ceil(numOfChars / 2))
    }
}