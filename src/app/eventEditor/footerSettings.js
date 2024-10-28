'use client';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Trash2 } from 'lucide-react';
import CollapsibleSection from './collapsibleSection';
import InputField from './inputField';

const FooterSettings = () => {
  const dispatch = useDispatch();
  const footerData = useSelector((state) => state.editor.footer);

  const handleCompanyInfoChange = (field, value) => {
    dispatch({
      type: 'editorData/updateCompanyInfo',
      payload: { field, value }
    });
  };

  const handleSocialLinkChange = (platform, url) => {
    dispatch({
      type: 'editorData/updateSocialLink',
      payload: { platform, url }
    });
  };

  const handleContactInfoChange = (field, value) => {
    dispatch({
      type: 'editorData/updateContactInfo',
      payload: { field, value }
    });
  };

  const handleAddLocation = () => {
    dispatch({
      type: 'editorData/addLocation',
      payload: { city: '', country: '' }
    });
  };

  const handleUpdateLocation = (index, field, value) => {
    dispatch({
      type: 'editorData/updateLocation',
      payload: { index, field, value }
    });
  };

  const handleRemoveLocation = (index) => {
    dispatch({
      type: 'editorData/removeLocation',
      payload: index
    });
  };

  const handleAddQuickLink = () => {
    dispatch({
      type: 'editorData/addQuickLink',
      payload: { label: '', url: '' }
    });
  };

  const handleUpdateQuickLink = (index, field, value) => {
    dispatch({
      type: 'editorData/updateQuickLink',
      payload: { index, field, value }
    });
  };

  const handleRemoveQuickLink = (index) => {
    dispatch({
      type: 'editorData/removeQuickLink',
      payload: index
    });
  };

  return (
    <div className="space-y-4">
      <CollapsibleSection title="Company Information">
        <div className="space-y-4">
          <InputField
            label="Company Name"
            value={footerData.companyInfo.name}
            onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
          />
          <InputField
            label="Slogan"
            value={footerData.companyInfo.slogan}
            onChange={(e) => handleCompanyInfoChange('slogan', e.target.value)}
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Social Links">
        <div className="space-y-4">
          <InputField
            label="Facebook URL"
            value={footerData.socialLinks.facebook}
            onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
          />
          <InputField
            label="Twitter URL"
            value={footerData.socialLinks.twitter}
            onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
          />
          <InputField
            label="Instagram URL"
            value={footerData.socialLinks.instagram}
            onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
          />
          <InputField
            label="LinkedIn URL"
            value={footerData.socialLinks.linkedin}
            onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Contact Information">
        <div className="space-y-4">
          <InputField
            label="Email"
            value={footerData.contactInfo.email}
            onChange={(e) => handleContactInfoChange('email', e.target.value)}
          />
          <InputField
            label="Phone"
            value={footerData.contactInfo.phone}
            onChange={(e) => handleContactInfoChange('phone', e.target.value)}
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Locations">
        <div className="space-y-4">
          {footerData.locations.map((location, index) => (
            <div key={index} className="space-y-2 p-3 bg-white/5 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Location {index + 1}</span>
                <button
                  onClick={() => handleRemoveLocation(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <InputField
                label="City"
                value={location.city}
                onChange={(e) => handleUpdateLocation(index, 'city', e.target.value)}
              />
              <InputField
                label="Country"
                value={location.country}
                onChange={(e) => handleUpdateLocation(index, 'country', e.target.value)}
              />
            </div>
          ))}
          <button
            onClick={handleAddLocation}
            className="w-full flex items-center justify-center gap-2 py-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors"
          >
            <Plus size={16} />
            <span>Add Location</span>
          </button>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Quick Links">
        <div className="space-y-4">
          {footerData.quickLinks.map((link, index) => (
            <div key={index} className="space-y-2 p-3 bg-white/5 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Link {index + 1}</span>
                <button
                  onClick={() => handleRemoveQuickLink(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <InputField
                label="Label"
                value={link.label}
                onChange={(e) => handleUpdateQuickLink(index, 'label', e.target.value)}
              />
              <InputField
                label="URL"
                value={link.url}
                onChange={(e) => handleUpdateQuickLink(index, 'url', e.target.value)}
              />
            </div>
          ))}
          <button
            onClick={handleAddQuickLink}
            className="w-full flex items-center justify-center gap-2 py-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors"
          >
            <Plus size={16} />
            <span>Add Quick Link</span>
          </button>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default FooterSettings;