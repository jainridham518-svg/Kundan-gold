import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { BUSINESS_INFO, getBookVisitWhatsAppUrl } from '../data/businessInfo';
import { Product } from '../types';

interface BookVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: Product | null;
}

export const BookVisitModal: React.FC<BookVisitModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
}) => {
  if (!isOpen) return null;

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  // Default to tomorrow's date formatted YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDate);
  const [timeSlot, setTimeSlot] = useState('11:30 AM – 12:00 PM (Morning Slot)');
  const [interest, setInterest] = useState(
    selectedProduct
      ? `${selectedProduct.name} (${selectedProduct.id})`
      : 'General Jewellery Consultation'
  );

  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (date) {
      const selectedDay = new Date(date + 'T00:00:00').getDay();
      if (selectedDay === 1) {
        setValidationError('Kundan Gold showroom is closed on Mondays. Please select a date from Tuesday to Sunday.');
        return;
      }
    }

    setValidationError('');
    const bookingUrl = getBookVisitWhatsAppUrl({
      name: name.trim(),
      phone: phone.trim(),
      date,
      time: timeSlot,
      interest,
    });

    window.open(bookingUrl, '_blank');
    onClose();
  };

  const timeSlots = [
    // Morning Window: 10:00 AM - 1:00 PM
    '10:00 AM – 10:30 AM',
    '10:30 AM – 11:00 AM',
    '11:00 AM – 11:30 AM',
    '11:30 AM – 12:00 PM',
    '12:00 PM – 12:30 PM',
    '12:30 PM – 01:00 PM',
    // Afternoon Window: 1:00 PM - 5:00 PM
    '01:00 PM – 01:30 PM',
    '01:30 PM – 02:00 PM',
    '02:00 PM – 02:30 PM',
    '02:30 PM – 03:00 PM',
    '03:00 PM – 03:30 PM',
    '03:30 PM – 04:00 PM',
    '04:00 PM – 04:30 PM',
    '04:30 PM – 05:00 PM',
    // Evening Window: 5:00 PM - 9:00 PM
    '05:00 PM – 05:30 PM',
    '05:30 PM – 06:00 PM',
    '06:00 PM – 06:30 PM',
    '06:30 PM – 07:00 PM',
    '07:00 PM – 07:30 PM',
    '07:30 PM – 08:00 PM',
    '08:00 PM – 08:30 PM',
    '08:30 PM – 09:00 PM',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-visit-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-lg bg-[#151513] rounded-2xl border border-[#C9A45C]/30 shadow-2xl overflow-hidden my-6">
        {/* Header in Deep Emerald */}
        <div className="bg-[#063B2E] text-[#F5F0E6] p-5 sm:p-6 flex items-start justify-between border-b border-[#C9A45C]/35">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#C9A45C] font-semibold tracking-wider uppercase mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
              <span>In-Store Consultation</span>
            </div>
            <h3 id="book-visit-title" className="font-heading text-xl sm:text-2xl font-semibold text-[#F5F0E6]">
              Book a Shop Visit
            </h3>
            <p className="text-xs text-[#A9A39A] mt-1">
              {BUSINESS_INFO.consultation.duration} • Personal trial &amp; consultation at our Kalyan West shop
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#F5F0E6] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shop Timings & Location Notification Strip */}
        <div className="bg-[#0B0B0A] px-6 py-3 border-b border-[#242420] text-xs space-y-1 text-[#A9A39A]">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
            <span className="truncate">
              <strong className="text-[#F5F0E6]">Location:</strong> Kundan Gold, Sai Gaurav C-1, Kalyan West
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
            <span>
              <strong className="text-[#F5F0E6]">Timings:</strong> Tuesday–Sunday: 10:00 AM – 9:00 PM • <span className="text-red-400 font-semibold">Monday: Closed</span>
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-[#151513]">
          {validationError && (
            <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-lg text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-[#F5F0E6] mb-1">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rajesh Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm bg-[#0B0B0A] border border-[#242420] rounded-lg px-3.5 py-2.5 text-[#F5F0E6] placeholder:text-[#66635D] focus:outline-none focus:border-[#C9A45C]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-[#F5F0E6] mb-1">
              WhatsApp / Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. 9820012345"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-sm bg-[#0B0B0A] border border-[#242420] rounded-lg px-3.5 py-2.5 text-[#F5F0E6] placeholder:text-[#66635D] focus:outline-none focus:border-[#C9A45C]"
            />
          </div>

          {/* Preferred Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#F5F0E6] mb-1">
                Preferred Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                required
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-sm bg-[#0B0B0A] border border-[#242420] rounded-lg px-3 py-2 text-[#F5F0E6] focus:outline-none focus:border-[#C9A45C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F0E6] mb-1">
                Preferred Time Slot <span className="text-red-400">*</span>
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full text-sm bg-[#0B0B0A] border border-[#242420] rounded-lg px-3 py-2 text-[#F5F0E6] focus:outline-none focus:border-[#C9A45C]"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot} className="bg-[#151513] text-[#F5F0E6]">
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Jewellery Interest */}
          <div>
            <label className="block text-xs font-semibold text-[#F5F0E6] mb-1">
              Jewellery Interest / Requirement
            </label>
            <input
              type="text"
              placeholder="e.g. 22K Gold Bangle trial, Custom bridal set, Ring sizing"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full text-sm bg-[#0B0B0A] border border-[#242420] rounded-lg px-3.5 py-2.5 text-[#F5F0E6] placeholder:text-[#66635D] focus:outline-none focus:border-[#C9A45C]"
            />
          </div>

          {/* WhatsApp message note */}
          <div className="bg-[#0B0B0A] p-3 rounded-lg border border-[#242420] text-[11px] text-[#A9A39A] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
            <p>
              Your booking request will be generated via WhatsApp directly to Kundan Gold (<strong className="text-[#F5F0E6]">8097151843</strong>) for instant confirmation.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#063B2E] hover:bg-[#084B3B] text-[#F5F0E6] border border-[#C9A45C]/40 py-3 px-4 rounded-lg font-semibold text-sm transition-colors shadow-sm cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Confirm &amp; Send Booking via WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};
