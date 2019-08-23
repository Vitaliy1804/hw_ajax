window.onload = function () {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://swapi.co/api/films/');
    request.send();
    request.onload = function () {
        if (request.status !== 200) {
            alert(`Ошибка ${request.status}: ${request.statusText}`);
        } 
        else {
            const filmList = JSON.parse(request.response);
            const resultList = filmList.results;
            resultList.forEach(elem => {
                let content = document.createElement("div");
                content.innerHTML = `<p class="item">Movie title: ${elem.title}</p>
                                    <p class="item">Episode number: ${elem.episode_id}</p>
                                    <p class="item">Description: ${elem.opening_crawl}</p>
                                    <button class="button" id="button">Список персонажей</button>`;
                content.classList.add("film-item");
                content.id = elem.episode_id;
                document.getElementById("film-content").appendChild(content);
            });

            document.addEventListener("click", function (e) {
                let eventTarget;
                if (e.target.classList.contains("button")) {
                    eventTarget = e.target;
                   
                }
                const eventFilmId = eventTarget.parentNode.id;

                let cast = document.createElement("ul");
                cast.innerHTML = "Список персонажей: ";
                resultList.forEach(elem => {
                    if (elem.episode_id == eventFilmId) {
                        const charactersList = elem.characters;
                        charactersList.forEach(item => {
                            let request = new XMLHttpRequest();
                            request.open('GET', item);
                            request.send();
                            request.onload = function () {
                                if (request.status !== 200) {
                                    alert(`Ошибка ${request.status}: ${request.statusText}`);
                                } else {
                                    cast.innerHTML += `${JSON.parse(request.response).name}; `;
                                    
                                }
                            }
                        });
                    }
                   request.onerror = function () {
                        alert("Запрос не удался");
                    };
                });
                cast.classList.add("item");
                document.getElementById(eventFilmId).appendChild(cast);
                eventTarget.remove();
            });
        }
    }

       request.onerror = function () {
        alert("Запрос не удался");
    };
}
