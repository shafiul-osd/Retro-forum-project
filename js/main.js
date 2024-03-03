const postContainer = document.getElementById("post-container");

const fetchPost = ()=>{
	let url = `https://openapi.programming-hero.com/api/retro-forum/posts`;
	fetch(url)
	.then(res => res.json())
	.then((data)=>{
		const posts = data.posts;
		posts.forEach(({id,category,image,isActive,title,author,description,comment_count,view_count,posted_time})=>{
			postContainer.innerHTML += `
				<div class="border border-blue-500 shadow-xl rounded-3xl overflow-hidden">
    					<div class="card w-full bg-base-100 ">
						  <div class="card-body grid grid-cols-1 md:grid-cols-5">
						    <div class="col-span-1">
						    	<div class="avatar ${isActive ? 'online' : 'offline'}">
  									<div class="w-24 rounded-full">
   									<img src="${image}" />
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
						    			<p><i class="fa-solid fa-eye"></i><span> ${view_count}</span></p>
						    			<p><i class="fa-regular fa-clock"></i><span> ${posted_time} min</span></p>
						    		</div>
						    		<div class="text-2xl">
						    			<span><i class="fa-solid fa-envelope-circle-check"></i></span>
						    		</div>
						    	</div>
						    </div>
 						  </div>
						  </div>
    				</div>
			`;
		})
	})
}

fetchPost()

const fetchLatestPost = ()=>{
	const url = `https://openapi.programming-hero.com/api/retro-forum/latest-posts`;
	const latestPostContainer = document.getElementById('latest-post-container');
	fetch(url)
	.then(res=> res.json())
	.then((data)=>{
		const posts = data;
		posts.forEach(({cover_image,profile_image,title,description,author,})=>{
			
			latestPostContainer.innerHTML +=`
				<div class="border rounded-3xl p-3 shadow-xl">
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
    					</div>
			`;
		})
	})
}
fetchLatestPost()