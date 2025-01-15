import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import UserForm from '../components/UserForm';
import SubscriptionForm from '../components/SubscriptionForm';
import AddressForm from '../components/AddressForm';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2'

function SignUp() {

  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    addressLine: '',
    city: '',
    zipcode: '',
    country: '',
  });

  const [subscription, setSubscription] = useState({
    username: userInfo.username,
    quota: 0,
    subType: '',
    price: 0.00,
  });

  const [step, setStep] = useState(1);
  
  const navigate = useNavigate();

  const variants = {
    hidden: { opacity: 0, x: '10vw', transition: { duration: 0.6, ease: "anticipate" } },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { opacity: 0, x: '-10vw', transition: { duration: 0.5, ease: "easeInOut" } },
  }

  useEffect(() => {
    if (step === 4) {
      fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userInfo: userInfo,
          subscriptionInfo: subscription
        })
      })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        sessionStorage.setItem("user", `${userInfo.username}`);
        Swal.fire({
          title: "Success!",
          text: data.message,
          icon: "success",
        }).then(function() {
          navigate('/Menu');
        })
      } else {
        Swal.fire({
          title: "Something Wrong!",
          text: data.message,
          icon: "error",
        }).then(function() {
          navigate('/');
        })
      }
    })
    .catch(error => {
      Swal.fire({
        title: "Something Wrong!",
        text: error.message,
        icon: "error",
      }).then(function() {
        navigate('/');
      })
    })
  }
}, [step])
  
  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
      <Link to='/'>
        <img src={logo} alt='logo'className='absolute left-8 top-8 w-32 md:w-36 lg:w-40 h-auto' />
      </Link>
      
      <AnimatePresence mode='wait' initial={false}>
        {step === 1 && (
          <motion.div
            key="userForm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <UserForm setUserInfo={setUserInfo} setStep={setStep} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="subscriptionForm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <SubscriptionForm setSubscription={setSubscription} setStep={setStep} />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="addressForm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <AddressForm setUserInfo={setUserInfo} setStep={setStep} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SignUp
