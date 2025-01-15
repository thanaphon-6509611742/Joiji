import React, { useState } from 'react'

function SubscriptionForm( {setSubscription, setStep} ) {

    const type = ["STANDARD", "PREMIER"];
    const price = [9, 14];
    const disc = [1, 2];
    const [selected, setSelected] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        try {
            await setSubscription({subType: type[selected], price: price[selected] + 0.99, quota: disc[selected]});
            setStep(3);
        } catch (error) {
            console.error(error);
            alert('There was an error submitting the form. Please try again.');
        }
        setLoading(false);
    }
    
    const form = ( num, isSelect) => (
        <div className='space-y-3'>
            <span className={`font-normal text-2xl text-center block ${isSelect ? 'text-red-netflix' : 'text-stone-700'}`}>{type[num]}</span>
            <div onClick={() => {setSelected(num == 0 ? 0 : 1)}} 
                    className={`bg-white shadow-lg shadow-slate-200 rounded-sm p-8 w-96 text-center flex flex-col cursor-pointer ${isSelect ? 'border-2 border-red-netflix border-t-[20px]' : 'border-2 border-transparent border-t-[20px]'} hover:shadow-xl transition-all duration-200 ease-in-out`}>
                <div className='flex flex-col space-y-5 border-b border-neutral-300 text-stone-700 font-normal'>
                    <span className='text-stone-700 text-2xl font-medium'>$
                        <span className='text-7xl font-medium'>{price[num]}</span>.99
                    </span>
                    <span className='text-lg pb-5'>Price per month</span>
                </div >
                <div className='flex flex-col mt-5 space-y-5 border-b border-neutral-300 text-stone-700 text-lg font-normal'>
                    <span className='font-medium text-lg'>{disc[num]}
                        <span className='font-normal'>{" "}disc out-at-a-time</span>
                    </span>
                    <span className='font-medium'>Unlimited
                        <span className='font-normal'>{" "}per month</span>
                    </span>
                    <span className='pb-5'>DVD and Blu-rays</span>
                </div>
                <div className='flex flex-col mt-5 space-y-5 text-stone-700 text-lg font-normal'>
                    <span>No late fees</span>
                    <span>Free shipping & returns</span>
                    <span className='pb-5'>Cancel anytime</span>
                </div>
            </div>
        </div>
    );

  return (
    <div>
        <h1 className='inset-x-0 top-full h-full text-center font-bold text-3xl text-stone-700'>Choose a plan</h1>
        <div className='flex flex-row space-x-8 mt-20'>
            {selected === 0 ? form(0, 1) : form(0, 0) }
            {selected === 1 ? form(1, 1) : form(1, 0) }
        </div>
        <div className='flex justify-center items-center'>
            <button type="submit" onClick={handleSubmit} className='mt-5 bg-red-netflix text-white font-normal text-2xl rounded w-96 h-16 active:bg-red-netflix-active'>{loading ? 'Loading...' : 'Next'}</button>
        </div>
    </div>
  )
}
export default SubscriptionForm