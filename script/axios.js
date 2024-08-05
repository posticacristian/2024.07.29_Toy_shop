const card_container = document.querySelector('.card_container');
const create_card = (element) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card_container.append(card);
    card.setAttribute('data-id', element.id);
    const h2 = document.createElement('h2');
    h2.textContent = element.name;
    const img = document.createElement('img');
    img.setAttribute('src', element.image);
    const button_like = document.createElement('button');
    button_like.classList.add('button_like');
    button_like.textContent = `${element.likes} likes`;
    const button_delete = document.createElement('button');
    button_delete.classList.add('button_delete');
    button_delete.textContent = "Delete";
    card.append(h2, img, button_like, button_delete);
}
const click_here = document.querySelector('.span_button');
const button_form = document.querySelector('.button_form');
click_here.addEventListener('click', () => {
    button_form.classList.toggle('button_form_nodis')
})
axios.get('http://localhost:3000/toys')
    .then(response => response.data.forEach(item=>{
            create_card(item)
        }))
const input_name = document.querySelector('.input_name');
const input_img = document.querySelector('.input_img');
const form = document.querySelector('.form');
form.addEventListener('submit', event => {
    event.preventDefault();
    axios.post('http://localhost:3000/toys', {
        name: input_name.value,
        image: input_img.value,
        likes: 0
    })
        .then(response => response.data)
        .then(create_card)
    input_name.value = '';
    input_img.value = '';
})
card_container.addEventListener('click', event =>{
    if (event.target.className === 'button_like'){
        const id_like = event.target.parentElement.dataset.id;
        const likes_counter = parseInt(event.target.textContent);
        event.target.textContent = `${likes_counter + 1} likes`;
        axios.patch(`http://localhost:3000/toys/${id_like}`,{
            likes: likes_counter + 1
        })
            .then(response => response.data)
    }
})
card_container.addEventListener('click', event =>{
    if (event.target.className === 'button_delete'){
        const id_delete = event.target.parentElement.dataset.id;
        axios.delete(`http://localhost:3000/toys/${id_delete}`)
            .then(response => {
                if (response.status === 200){
                    event.target.parentElement.remove()
                }
            })
    }
})