export default function Comment(comment){
    // here we use recursion to get nested comments
    let hasNested = comment.comments.length > 0;

    return `
        <div class ="nested-comments-${comment.level}">
            <p class = "comment-header">
                ${comment.user} | ${comment.time_ago}
            </p>
            ${comment.content}
            //recursive call to nested comments
            ${hasNested ? comment.comments.map(comment => Comment(comment)).join(""): ""};
        </div>
    `

}