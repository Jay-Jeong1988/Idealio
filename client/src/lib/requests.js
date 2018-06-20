

const Restaurant = {
    all() {
        return fetch('/restaurants').then( res => res.json() )
    },
    // all = async() => {
    //     const res = await fetch('/restaurants');
    //     const body = await res.json();

    //     if ( res.status !== 200 ) throw Error(body.message);
    //     return body;
    // }
    one(id) {
        return fetch(`/restaurants/${id}`).then( res => res.json() )
    }
}

const User = {
    create(params) {
        return fetch('/sign-up', {
                method: 'POST',
                headers: { 'Accept': 'application/json',
                'Content-Type': 'application/json' },
                body: JSON.stringify(params)
            }).then( res => res.json() )
    },
    signIn(params) {
        return fetch('/sign-in', {
            method: 'POST',
            headers: { 'Accept': 'application/json',
            'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        }).then( res => res.json() )
    }
}

const Evaluation = {
    create(id, params) {
        return fetch(`/eval_rest/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        }).then( res => res.json() )
    }
}

export { User, Restaurant, Evaluation };