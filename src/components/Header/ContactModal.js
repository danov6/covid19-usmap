import React from "react";

const ContactModal = () => {
  return (
    <div className="modal" tabIndex="-1" role="dialog" id="contact_modal" style={{backgroundColor: '#2d2d2d'}}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" style={{color: '#fff'}}>Let's get in touch!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p style={{color: '#fff'}}>We appreciate all feedback.</p>
                <form>
                    <input name="name" type="text" placeholder="Full name"/>
                    <input name="email" type="email" placeholder="Email"/>
                    <textarea name="message" placeholder="Write a message.."/>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>
  );
};

export default ContactModal;