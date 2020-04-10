import React, {useState} from "react";
import LoadingSpinner from './../../LoadingSpinner'
const ContactModal = () => {
  const [loading, setLoading] = useState(false);  

  const handleSubmit = e => {
    e.preventDefault();

    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let message = document.querySelector('#message').value;

    if(name === "" || email === "" || message === "") return;

    setLoading(true);

    fetch(process.env.PUBLIC_URL + '/php/form-process.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    })
    .then(res => console.log(res.body))
    .catch(e => {
        console.log(e);
        setLoading(false);
    })
  };
  return (
    <div className="modal" tabIndex="-1" role="dialog" id="contact_modal">
        <form id="contact_form" onSubmit={handleSubmit}>
            <div className="modal-dialog" role="document">
                {loading ? <LoadingSpinner /> :
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" style={{color: '#000'}}>Let's get in touch!</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p style={{color: '#000'}}>We appreciate all feedback.</p>
                        <input name="name" type="text" id="name" placeholder="Full name"/>
                        <input name="email" type="email" id="email" placeholder="Email"/>
                        <textarea name="message" id="message" placeholder="Write a message.."/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" type="submit">Submit</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
                }
            </div>
        </form>
    </div>
  );
};

export default ContactModal;