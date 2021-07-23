document.addEventListener("DOMContentLoaded", function() {


    console.log("DOM loaded");

    const highScoresList = document.querySelector('#highScoresList');
    
    //get high scores
    var template=""
    const highScores = JSON.parse(localStorage.getItem('score')) || [];
    highScores.forEach(function(score) {
        template += `
            <li>
                <span>${score.user}</span>
                <span>${score.score}</span>
            </li>
        `;
    });
    highScoresList.innerHTML = template;
});