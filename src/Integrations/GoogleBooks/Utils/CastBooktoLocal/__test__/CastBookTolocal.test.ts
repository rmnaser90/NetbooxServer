import axios, { AxiosResponse } from "axios";
import GoogleBookType from "../../../../../Types/GoogleBookType";
import LocalBookType from "../../../../../Types/LocalBookType";
import castBookToLocal from "../CastBookToLocal";
describe("testing cast Book To local function",  () => {

    it('should return local books', async () => {
        const { data } = await axios.get('https://www.googleapis.com/books/v1/volumes?q=MICHIO');
        const googleBooks:GoogleBookType[] = data.items
        const localBooks:LocalBookType[] = googleBooks.map(book => castBookToLocal(book))
        expect(localBooks[0]).toHaveProperty("googleId")
        expect(localBooks[1]).toHaveProperty("isbn10")
    });

});
