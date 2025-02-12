import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';


const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm('service_yq4d5go', 'template_e9acm6j', form.current, 't6dk9o9DwtTJXAcw5')
      .then((result) => {
          console.log(result.text);
          form.current.reset();
          setIsSending(false);
      }, (error) => {
          console.log(error.text);
          setIsSending(false);
      });
  };

  return (
    <section id="contact" className="flex p-8  text-white border-t-2 border-pink-600 mx-20 font-poppins ">
      {/* // <section id="contact" className="relative flex p-8 text-white mx-20 font-poppins border-t-2 border-transparent before:absolute before:inset-x-0 before:bottom-0 before:h-1 before:bg-gradient-to-r before:from-pink-500 before:to-purple-500 before:content-['']"> */}
   
      <div className="w-1/2 pl-4">
        <h2 className="text-2xl font-bold mb-4">Feel free to send me a message!</h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4 text-white">
          <input type="text" placeholder="Name" name="name" className="w-full p-2 border border-gray-700 rounded bg-gray-700 placeholder-white" />
          <input type="email" placeholder="Email" name="email" className="w-full p-2 border border-gray-700 rounded bg-gray-700 placeholder-white" />
          <textarea placeholder="Message" name="message" className="w-full p-2 border border-gray-700 rounded bg-gray-700 placeholder-white h-32" />
          <button type="submit" className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded hover:bg-gradient-to-l hover:from-pink-500 hover:to-purple-600">
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;