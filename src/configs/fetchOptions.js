const fetchOptions = {
    headers: new Headers({
        'X-Api-Key': process.env.NEXT_APP_API_KEY
    })
}

export default fetchOptions
