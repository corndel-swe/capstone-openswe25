const timeSince = (postCreatedAt) => {
    const createdAtDate = new Date(postCreatedAt).getTime()
    const now = Date.now()

    const secondsSincePost = Math.floor((now - createdAtDate) / 1000)
    
    if (secondsSincePost <= 60) {
        return 'Just now'
    }
    if (secondsSincePost < 3600) {
        return `${Math.floor(secondsSincePost / 60)} minutes ago`
    }
    if (secondsSincePost < 86400) {
        return `${Math.floor(secondsSincePost / 3600)} hours ago`
    }
    else {
        return `${Math.floor(secondsSincePost / 86400)} days ago`
    }
}
export default timeSince