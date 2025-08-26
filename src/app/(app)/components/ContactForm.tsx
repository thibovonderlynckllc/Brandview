'use client';

import { useState } from 'react';

interface ContactFormProps {
  formSettings: {
    submitButtonText: string;
    firstNameLabel: string;
    lastNameLabel: string;
    phoneLabel: string;
    emailLabel: string;
    messageLabel: string;
    requiredText: string;
  };
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactForm({ formSettings }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-lg md:text-[23px] mb-2 font-medium">
            {formSettings.firstNameLabel} <span className="font-light">{formSettings.requiredText}</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-4 md:py-6 rounded-3xl border-2 border-red bg-white focus:outline-none focus:border-red focus:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-lg md:text-[23px] mb-2 font-medium">
            {formSettings.lastNameLabel} <span className="font-light">{formSettings.requiredText}</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-4 md:py-6 rounded-3xl border-2 border-red bg-white focus:outline-none focus:border-red focus:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300"
          />
        </div>
      </div>
      
      <div className="mb-8">
        <label className="block text-lg md:text-[23px] mb-2 font-medium">
          {formSettings.phoneLabel} <span className="font-light">{formSettings.requiredText}</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-4 md:py-6 rounded-3xl border-2 border-red bg-white focus:outline-none focus:border-red focus:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300"
        />
      </div>

      <div className="mb-8">
        <label className="block text-lg md:text-[23px] mb-2 font-medium">
          {formSettings.emailLabel} <span className="font-light">{formSettings.requiredText}</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-4 md:py-6 rounded-3xl border-2 border-red bg-white focus:outline-none focus:border-red focus:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300"
        />
      </div>

      <div className="mb-8">
        <label className="block text-lg md:text-[23px] mb-2 font-medium">
          {formSettings.messageLabel}
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-4 md:py-6 rounded-3xl border-2 border-red bg-white h-40 resize-none focus:outline-none focus:border-red focus:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300"
        />
      </div>

      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-3xl">
          <p className="text-lg">Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-3xl">
          <p className="text-lg">{errorMessage}</p>
        </div>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-red text-blue text-xl md:text-[2.5rem] px-6 md:px-8 py-3 md:py-4 rounded-full transition-colors font-medium cursor-pointer ${
            isSubmitting 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-opacity-90'
          }`}
        >
          {isSubmitting ? 'Sending...' : formSettings.submitButtonText}
        </button>
      </div>
    </form>
  );
}
