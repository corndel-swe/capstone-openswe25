const formatCreatedAt = (createdAtStr) => `${createdAtStr.slice(8, 10)}-${createdAtStr.slice(5, 7)}-${createdAtStr.slice(0, 4)}`

export default formatCreatedAt