const postContainer = document.getElementById("post-container");
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const markAsCount = document.getElementById('mark-as-count');

const loading = document.getElementById('loading');

let markedPosts = [];

const fetchPost = (searchText) => {
    searchText = typeof searchText === "undefined" || searchText === "" ? 'posts' : `posts?category=${searchText}`;
    loading.classList.remove('hidden');
    let url = `https://openapi.programming-hero.com/api/retro-forum/${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            const posts = data.posts;
            posts.forEach(({ id, category, image, isActive, title, author, description, comment_count, view_count, posted_time }) => {

                let div = document.createElement('div');
                
                div.classList.add('border', 'border-blue-500', 'shadow-xl', 'rounded-3xl', 'overflow-hidden');
                div.innerHTML = `
                    <div class="card w-full bg-base-100 ">
                        <div class="card-body grid grid-cols-1 md:grid-cols-5">
                            <div class="col-span-1">
                                <div class="avatar ${isActive ? 'online' : 'offline'}">
                                    <div class="w-20 rounded-full">
                                        <img  src="${image}" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-4">
                                <div class="flex gap-3">
                                    <span>#${category}</span>
                                    <span>Author: ${author.name}</span>
                                </div>
                                <div class="border-b border-dashed py-2">
                                    <h1 class="my-1 text-2xl">${title}</h1>
                                    <p class="my-1">
                                        ${description}
                                    </p>
                                </div>
                                <div class="flex justify-between items-center my-3">
                                    <div class="flex  md:flex-row gap-4 items-center">
                                        <p><i class="fa-regular fa-message"></i> <span>${comment_count}</span></p>
                                        <p><i class="fa-solid fa-eye"></i><span id="viewCount_${id}"> ${view_count}</span></p>
                                        <p><i class="fa-regular fa-clock"></i><span> ${posted_time} min</span></p>
                                    </div>
                                    <div class="text-2xl" onclick="handleMarkAsRead('${title}', ${view_count})">
                                        <i id="markAsRead_${id}" class="fa-solid fa-envelope-circle-check text-green-500"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                postContainer.appendChild(div);

             
                const markAsReadIcon = document.getElementById(`markAsRead_${id}`);
                markAsReadIcon.addEventListener('click', () => {
                    handleMarkAsRead(title, view_count);
                });
                loading.classList.add('hidden')
            })
        })
}

searchBtn.addEventListener("click", () => {
	
	loading.classList.remove('hidden');
	
    postContainer.innerHTML = '';
    const searchText = searchInput.value;
    fetchPost(searchText);
})

fetchPost();

const fetchLatestPost = ()=>{
    const url = `https://openapi.programming-hero.com/api/retro-forum/latest-posts`;
    const latestPostContainer = document.getElementById('latest-post-container');
    fetch(url)
        .then(res=> res.json())
        .then((data)=>{
            const posts = data;
            
            
            posts.forEach(({cover_image,profile_image,title,description,author,})=>{
                let div = document.createElement('div');
                div.classList.add('border','rounded-3xl','p-3','shadow-xl');
            
                div.innerHTML = `
                    <div class="text-left space-y-5">
                                <img class="border rounded-3xl w-full h-52" src="${cover_image}" alt="" />
                                <div class="flex items-center gap-3">
                                    <i class="fa-solid fa-calendar-days"></i> <span>${typeof author.posted_date !== "undefined" ? author.posted_date : 'No Publish date'}</span>
                                </div>
                                <div class="">
                                    <h1 class="text-xl font-bold">${title}</h1>
                                    <p>${description}</p>
                                </div>
                                <div class="grid grid-cols-5 items-center">
                                    <div class="col-span-1">
                                        <div class="avatar">
                                            <div class="w-10 rounded-full">
                                                <img src="${profile_image}" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-span-4">
                                        <p class="text-xl font-bold">${author.name}</p>
                                        <p class="text-base">${typeof author.designation !== 'undefined' ? author.designation : 'Unknown'}</p>
                                    </div>
                                </div>
                                </div>
                `;
                latestPostContainer.appendChild(div);
            })
            
        })
}

fetchLatestPost()

const handleMarkAsRead = (title, viewCount) => {
    let isAlreadyMarked = false;

    for (const post of markedPosts) {
        if (post.title === title) {
            isAlreadyMarked = true;
            break;
        }
    }

    if (!isAlreadyMarked) {
        markedPosts.push({ title, viewCount });
        markAsCount.innerText = `Mark as read (${markedPosts.length})`;
        
        let markedPostDisplay = document.getElementById('marked-post-display');
        let div = document.createElement('div');
			div.classList.add('flex','justify-between','bg-white','p-2','my-5','rounded-2xl');
			div.innerHTML = "";
        markedPosts.forEach((post)=>{
   		 	div.innerHTML =`
   		 		<p>${post.title}</p>
    				<p class="flex items-center gap-1"><i class="fa-solid fa-eye"></i><span> ${post.viewCount.toString()}</span></p>
   		 	`;
   		 	console.log(post.viewCount)
   		 	markedPostDisplay.appendChild(div)
		  })
    }
    
};
