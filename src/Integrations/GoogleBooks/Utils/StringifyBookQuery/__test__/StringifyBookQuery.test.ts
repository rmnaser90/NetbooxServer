import stringifyBookQuery from '../stringifyBookQuery'
import { BookQuery } from '../../../../../Types/Types'

const mockQuery: BookQuery = {
    keyword: 'future',
    inauther: 'michio',
    intitle: 'mind'
}
const mockQueryWithKeywordOnly: BookQuery = {
    keyword: 'future'
}
describe('testing stringify query function', () => {
    it('should convert object of type BookQuery to return a string ', () => {
        const stringQuery = stringifyBookQuery(mockQuery)
        expect(stringQuery).toBe('future+inauther:michio+intitle:mind')
    })
    it('should return a string with only the keyword', () => {
        const stringQuery = stringifyBookQuery(mockQueryWithKeywordOnly)
        expect(stringQuery).toBe('future')
    })
})
