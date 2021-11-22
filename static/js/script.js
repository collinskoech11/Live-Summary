window.addEventListener('scroll', 
    function(){
        var tophead = document.querySelector('.header-container');
        tophead.classList.toggle('fixed', window.ScrollY > 300);
    })
    console.log('hello')