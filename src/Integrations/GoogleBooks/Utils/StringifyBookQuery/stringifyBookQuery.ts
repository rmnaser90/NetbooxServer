import { Query } from '../../../../Types/Types'

export default function stringifyBookQuery(query: Query) {
    let stringQuery: string = query.keyword
    for (const key in query) {
        if (key != 'keyword') {
            const singleQuery = `+${key}:${query[key] || ''}`
            stringQuery += singleQuery
        }
    }
    return stringQuery
}
