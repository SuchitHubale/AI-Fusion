import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';
import { firestore } from '../utils/firebase.js';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const RegistrationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event: '',
    amount: 0,
    collegeName: '',
    department: '',
    participantsNames: '',
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventName, setEventName] = useState("");

  const departments = [
    'CSE',
    'CS-IT',
    'MECHANICAL',
    'MECHATRONICS',
    'CIVIL',
    'ELECTRICAL',
    'MBA',
    'BBA',
    'AIML',
    'E&TC',
    'OTHER'
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "events"));
        const eventsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === 'event') {
      const selectedEvent = events.find(event => event.id === value);
      if (selectedEvent) {
        setEventName(selectedEvent.title);
        setFormData(prevFormData => ({
          ...prevFormData,
          amount: selectedEvent.amount,
        }));
      }
    }
  };

  const handlePayment = async () => {
    try {
      // Generate a unique order_id using UUID
      const orderId = uuidv4();
  
      // Initial data to be saved with an empty paymentId
      const paymentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        event: eventName,
        paymentId: "", // Empty string initially
        orderId: orderId, // Save generated UUID orderId in Firestore
        createdAt: new Date(Date.now()).toString(),
        department: formData.department,
        participantsNames: formData.participantsNames,
      };
  
      const paymentRef = collection(firestore, "registrations");
  
      // Save the initial document and get the document reference (Firestore)
      const docRef = await addDoc(paymentRef, paymentData);
  
      const options = {
        key: "rzp_live_WWtrU6NqmfDeSN", // Replace with your Razorpay live key
        amount: formData.amount * 100, // Amount in paise
        currency: "INR",
        name: "AIFUSION",
        description: "Payment for AI Fusion",
        image: "https://firebasestorage.googleapis.com/v0/b/aifusion-62507.appspot.com/o/logo.png?alt=media&token=2a7c190d-520a-4fac-b166-12506aa5d456", // Add your image URL if available
        order_id: "", // Use UUID as order_id
        handler: async (response) => {
          try {
            // Update Firestore document with the actual paymentId after successful payment
            await updateDoc(docRef, {
              paymentId: response.razorpay_payment_id,
            });
  
            // You can add a success message or perform additional actions
          
          } catch (error) {
            console.error("Error updating Firestore with payment ID:", error);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: "saai@ritindia.edu", // Add any additional notes
        },
      };
  
      // Initialize Razorpay and open payment window
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Error initiating payment or saving data to Firestore:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      handlePayment();
      onClose();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error('Registration failed. Please try again.', {
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: 'black',
          color: '#fff',
        },
      });
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-2xl font-bold text-gray-100">Fill out the form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-white bg-indigo-800 rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-white bg-indigo-800 rounded"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-white bg-indigo-800 rounded"
            />
          </div>
          <div>
            <label htmlFor="collegeName" className="block mb-1">College Name</label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-white bg-indigo-800 rounded"
            />
          </div>
          <div>
            <label htmlFor="department" className="block mb-1">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-white bg-indigo-800 rounded"
            >
              <option value="">Select a department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="participantsNames" className="block mb-1">Participants Names</label>
            <textarea
              id="participantsNames"
              name="participantsNames"
              value={formData.participantsNames}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-white bg-indigo-800 rounded"
              rows="3"
              placeholder="Enter names separated by commas"
            ></textarea>
          </div>
          <div>
      <label htmlFor="event" className="block mb-1">Event</label>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <select
          id="event"
          name="event"
          value={formData.event}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 text-white bg-indigo-800 rounded"
        >
          <option value="">Select an event</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
      )}
    </div>
          <div>
            <label htmlFor="amount" className="block mb-1">Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              readOnly
              className="w-full px-3 py-2 text-white bg-indigo-800 rounded"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 transition-colors bg-purple-600 rounded-full hover:bg-purple-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 transition-colors bg-indigo-500 rounded-full hover:bg-indigo-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;