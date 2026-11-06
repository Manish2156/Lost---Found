import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, CheckCircle2, MapPin, Tag, ShieldCheck, ArrowRight, Trash2 } from 'lucide-react';
import { LostFoundItem, ItemCategory, CollegeLocation } from '../types';
import { CATEGORIES, COLLEGE_LOCATIONS } from '../data/mockData';

interface ReportModalProps {
  initialType?: 'lost' | 'found';
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: LostFoundItem) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  initialType = 'lost',
  isOpen,
  onClose,
  onSubmit
}) => {
  const [reportType, setReportType] = useState<'lost' | 'found'>(initialType);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('Electronics');
  const [location, setLocation] = useState<CollegeLocation>('Canteen');
  const [specificSpot, setSpecificSpot] = useState('');
  const [dateOccurred, setDateOccurred] = useState('Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [description, setDescription] = useState('');
  const [verificationClue, setVerificationClue] = useState('');
  const [heldAtHub, setHeldAtHub] = useState<string>('Front gate security office');
  const [reporterName, setReporterName] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [reporterRole, setReporterRole] = useState<'Student' | 'Faculty' | 'Campus Staff'>('Student');
  
  // Image preview state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission result
  const [submittedItem, setSubmittedItem] = useState<LostFoundItem | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setReportType(initialType);
  }, [initialType]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Item title is required';
    if (!description.trim() || description.length < 10) {
      newErrors.description = 'Please provide a clear description (at least 10 characters)';
    }
    if (!reporterName.trim()) newErrors.name = 'Your name is required';
    if (!reporterEmail.trim() || !reporterEmail.includes('@')) {
      newErrors.email = 'Valid college email is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newId = 'LF-2026-' + Math.floor(1000 + Math.random() * 9000);
    const createdItem: LostFoundItem = {
      id: newId,
      title: title.trim(),
      type: reportType,
      category,
      location,
      specificSpot: specificSpot.trim() || undefined,
      dateReported: 'Just now',
      dateOccurred,
      status: reportType === 'lost' ? 'lost' : 'found',
      description: description.trim(),
      imageUrl: imagePreview || undefined,
      verificationQuestion: verificationClue.trim() || undefined,
      heldAtHub: reportType === 'found' ? heldAtHub : undefined,
      reportedBy: {
        name: reporterName.trim(),
        role: reporterRole,
        contactMethod: 'Student Email'
      },
      tags: [category, location, reportType.toUpperCase()]
    };

    onSubmit(createdItem);
    setSubmittedItem(createdItem);
  };

  const handleResetAndClose = () => {
    setSubmittedItem(null);
    setTitle('');
    setLocation('Canteen');
    setSpecificSpot('');
    setDescription('');
    setVerificationClue('');
    setImagePreview(null);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#dce6d5] overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5edd0] bg-[#f8faf5]">
          <div>
            <h3 className="text-base font-bold text-[#153931] font-display">
              {reportType === 'lost' ? 'Report a Missing Item' : 'Report a Found Item'}
            </h3>
            <p className="text-xs text-[#526b63]">
              Submit details to alert students and college custody desks.
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {submittedItem ? (
          <div className="p-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#e8f3ef] text-[#153931] flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold text-[#153931] font-display">
                Report Registered Successfully
              </h4>
              <p className="text-xs text-[#526b63] max-w-md mx-auto">
                Your report is now live in the college inventory. When an ownership claim or match occurs, you will receive an alert at{' '}
                <span className="font-semibold text-[#153931]">{submittedItem.reportedBy.name}</span>.
              </p>
            </div>

            {/* Reference Card */}
            <div className="p-4 rounded-2xl bg-[#f8faf6] border border-[#d8e3d2] text-left space-y-2 max-w-md mx-auto text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#657f76]">Tracking Reference ID</span>
                <span className="font-mono font-bold text-[#153931] bg-[#e6eee1] px-2.5 py-0.5 rounded border border-[#c8d9c1]">
                  {submittedItem.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#657f76]">Item Name</span>
                <span className="font-medium text-[#153931]">{submittedItem.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#657f76]">College Building</span>
                <span className="font-medium text-[#153931]">{submittedItem.location}</span>
              </div>
              {submittedItem.specificSpot && (
                <div className="flex items-center justify-between">
                  <span className="text-[#657f76]">Exact Spot</span>
                  <span className="font-medium text-[#153931]">{submittedItem.specificSpot}</span>
                </div>
              )}
            </div>

            <div className="pt-3 flex items-center justify-center gap-3">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-[#153931] hover:bg-[#0e2722] text-white text-xs font-semibold rounded-full transition-colors shadow-sm"
              >
                View in Campus Inventory
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
            
            {/* Top Toggle: Lost vs Found */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#f0f4ec] rounded-full">
              <button
                type="button"
                onClick={() => setReportType('lost')}
                className={`py-2 text-xs font-semibold rounded-full transition-all ${
                  reportType === 'lost'
                    ? 'bg-white text-[#153931] shadow-xs'
                    : 'text-[#58736a] hover:text-[#153931]'
                }`}
              >
                I Lost Something
              </button>
              <button
                type="button"
                onClick={() => setReportType('found')}
                className={`py-2 text-xs font-semibold rounded-full transition-all ${
                  reportType === 'found'
                    ? 'bg-white text-[#153931] shadow-xs'
                    : 'text-[#58736a] hover:text-[#153931]'
                }`}
              >
                I Found an Item
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1e3831]">
                  Item Title &amp; Brand *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Boat Earbuds, Skybags Backpack, Fastrack Watch, or Scientific Calculator"
                  className="w-full px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931]"
                />
                {errors.title && <p className="text-[11px] text-rose-600">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#1e3831]">
                    Category *
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ItemCategory)}
                      className="w-full appearance-none px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931]"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {/* College Location Dropdown (Strictly Limited to the 10 Requested Addresses) */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#1e3831]">
                    College Address / Building *
                  </label>
                  <div className="relative">
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value as CollegeLocation)}
                      className="w-full appearance-none px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931] cursor-pointer"
                    >
                      {COLLEGE_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Exact Spot within building */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#1e3831]">
                    Specific Spot / Classroom (Optional)
                  </label>
                  <input
                    type="text"
                    value={specificSpot}
                    onChange={(e) => setSpecificSpot(e.target.value)}
                    placeholder="e.g. Room 204 second bench, Table 3, or near water cooler"
                    className="w-full px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#1e3831]">
                    Date &amp; Approximate Time
                  </label>
                  <input
                    type="text"
                    value={dateOccurred}
                    onChange={(e) => setDateOccurred(e.target.value)}
                    placeholder="e.g. Today around 2:15 PM"
                    className="w-full px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30"
                  />
                </div>
              </div>

              {/* Custody location if found */}
              {reportType === 'found' && (
                <div className="space-y-1 p-3 bg-[#eef4ec] rounded-2xl border border-[#d6e3d2]">
                  <label className="block text-xs font-semibold text-[#153931]">
                    Where is the item turned in / stored? *
                  </label>
                  <select
                    value={heldAtHub}
                    onChange={(e) => setHeldAtHub(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#cfdacb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 bg-white text-slate-800"
                  >
                    <option value="Front gate security office">Front gate security checkpoint (Recommended)</option>
                    <option value="Canteen service desk">Canteen service desk</option>
                    <option value="Sci building office">Sci building office</option>
                    <option value="Rupangan auditorium desk">Rupangan auditorium desk</option>
                    <option value="New law building library desk">New law building library desk</option>
                    <option value="Held by finder (safe handover on campus)">Held by finder (will meet owner at Front gate)</option>
                  </select>
                </div>
              )}

              {/* Detailed Description */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1e3831]">
                  Description &amp; Identifying Details *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe color, scratches, stickers, condition, case, or contents..."
                  className="w-full px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931]"
                />
                {errors.description && <p className="text-[11px] text-rose-600">{errors.description}</p>}
              </div>

              {/* Verification Question */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1e3831]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#296a58]" />
                  <span>
                    {reportType === 'found' ? 'Ownership Verification Question for Claimant' : 'Private Identifying Detail (For verification)'}
                  </span>
                </div>
                <input
                  type="text"
                  value={verificationClue}
                  onChange={(e) => setVerificationClue(e.target.value)}
                  placeholder={
                    reportType === 'found'
                      ? "e.g. 'What is the lock screen wallpaper?' or 'What is inside the front pouch?'"
                      : "e.g. Serial ending in 849, small sticker inside cover"
                  }
                  className="w-full px-3 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30 focus:border-[#153931]"
                />
              </div>

              {/* Photo Upload with preview */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#1e3831]">
                  Attach Photo (Live Preview)
                </label>
                
                {imagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-[#d4ded0] aspect-[16/9] max-h-48 group">
                    <img
                      src={imagePreview}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium rounded-full transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove Photo</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#d4ded0] hover:border-[#153931] rounded-2xl p-4 text-center cursor-pointer transition-colors bg-[#f8faf6] hover:bg-[#eef5eb]"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-full bg-[#e8f3ef] text-[#153931] flex items-center justify-center mx-auto mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-[#153931]">Click to upload a clear photo</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, or WEBP up to 10MB</p>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="pt-2 border-t border-[#e2ebd9] space-y-2">
                <h4 className="text-xs font-bold text-[#142d27] uppercase tracking-wider">
                  Reporter Contact Information
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1 sm:col-span-1">
                    <label className="block text-xs font-semibold text-[#1e3831]">Role</label>
                    <select
                      value={reporterRole}
                      onChange={(e) => setReporterRole(e.target.value as any)}
                      className="w-full px-2.5 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30"
                    >
                      <option value="Student">Student</option>
                      <option value="Faculty">Faculty</option>
                      <option value="Campus Staff">Campus Staff</option>
                    </select>
                  </div>

                  <div className="space-y-1 sm:col-span-1">
                    <label className="block text-xs font-semibold text-[#1e3831]">Your Name *</label>
                    <input
                      type="text"
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      placeholder="e.g. Raj Vishwakarma"
                      className="w-full px-2.5 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30"
                    />
                    {errors.name && <p className="text-[11px] text-rose-600">{errors.name}</p>}
                  </div>

                  <div className="space-y-1 sm:col-span-1">
                    <label className="block text-xs font-semibold text-[#1e3831]">College Email *</label>
                    <input
                      type="email"
                      value={reporterEmail}
                      onChange={(e) => setReporterEmail(e.target.value)}
                      placeholder="student@college.edu"
                      className="w-full px-2.5 py-2 text-xs bg-[#f8faf6] border border-[#d4ded0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#153931]/30"
                    />
                    {errors.email && <p className="text-[11px] text-rose-600">{errors.email}</p>}
                  </div>
                </div>
              </div>

            </div>

            {/* Submit Action Bar */}
            <div className="pt-3 border-t border-[#e2ebd9] flex items-center justify-between">
              <span className="text-[11px] text-[#657f76]">
                Campus registry preview mode
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-xs font-medium text-[#526b63] hover:text-[#153931] rounded-full hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#153931] to-[#256356] hover:from-[#0e2722] hover:to-[#1a4c41] rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Publish Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
