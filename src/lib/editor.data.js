import { createSlice } from "@reduxjs/toolkit";
export const editorData = createSlice({
  name: "editorData",
  initialState: {
    title: "Title",
    organization: "",
    date: "",
    time: "",
    where: "",
    head1: "What is all about us?",
    body1: "",
    logo: "",
    img1: "",
    img2: "",
    logoUrl: "",
    img1Url: "",
    img2Url: "",
    features: [],
    featuresTitle: "Featured Content",
    form: [{ text: "Your Email ?", isOptional: false, options: [] }],
    colors: {
      primary: "#1162fb",
      secondary: "#000000",
      accent: "#ffffff",
      text: "#ffffff",
    },
    footer: {
      companyInfo: {
        name: "Company Name",
        slogan: "Providing innovative solutions since 20XX",
      },
      socialLinks: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
      },
      contactInfo: {
        email: "contact@example.com",
        phone: "+1 (123) 456-7890",
      },
      locations: [
        { city: "New York", country: "NY" },
        { city: "San Francisco", country: "CA" },
        { city: "London", country: "UK" },
      ],
      quickLinks: [
        { label: "Home", url: "#" },
        { label: "About Us", url: "#" },
        { label: "Services", url: "#" },
        { label: "Blog", url: "#" },
        { label: "Contact", url: "#" },
      ],
    },
  },
  reducers: {
    // ... existing reducers ...
    handleTitle: (state, action) => {
      state.title = action.payload;
    },
    handleOrganization: (state, action) => {
      state.organization = action.payload;
    },
    handleHead1: (state, action) => {
      state.head1 = action.payload;
    },
    handleBody1: (state, action) => {
      state.body1 = action.payload;
    },
    handleLogo: (state, action) => {
      state.logo = action.payload;
    },
    handleImg1: (state, action) => {
      state.img1 = action.payload;
    },
    handleImg2: (state, action) => {
      state.img2 = action.payload;
    },
    handleDate: (state, action) => {
      state.date = action.payload;
    },
    handleTime: (state, action) => {
      state.time = action.payload;
    },
    handleWhere: (state, action) => {
      state.where = action.payload;
    },
    handleForm: (state, action) => {
      state.form = action.payload;
    },
    handleFeatures: (state, action) => {
      state.features.push(action.payload);
    },
    handleFeatureHead: (state, action) => {
      const { index, value } = action.payload;
      state.features[index].head = value;
    },
    handleFeatureBody: (state, action) => {
      const { index, value } = action.payload;
      state.features[index].body = value;
    },
    handleFeaturesTitle: (state, action) => {
      state.featuresTitle = action.payload;
    },
    handleImg1Url: (state, action) => {
      state.img1Url = action.payload;
    },
    handleImg2Url: (state, action) => {
      state.img2Url = action.payload;
    },
    handleLogoUrl: (state, action) => {
      state.logoUrl = action.payload;
    },
    handlePrimaryColor: (state, action) => {
      state.colors.primary = action.payload;
    },
    handleSecondaryColor: (state, action) => {
      state.colors.secondary = action.payload;
    },
    handleAccentColor: (state, action) => {
      state.colors.accent = action.payload;
    },
    handleTextColor: (state, action) => {
      state.colors.text = action.payload;
    },
    updateCompanyInfo: (state, action) => {
      const { field, value } = action.payload;
      state.footer.companyInfo[field] = value;
    },
    updateSocialLink: (state, action) => {
      const { platform, url } = action.payload;
      state.footer.socialLinks[platform] = url;
    },
    updateContactInfo: (state, action) => {
      const { field, value } = action.payload;
      state.footer.contactInfo[field] = value;
    },
    addLocation: (state, action) => {
      state.footer.locations.push(action.payload);
    },
    updateLocation: (state, action) => {
      const { index, field, value } = action.payload;
      state.footer.locations[index][field] = value;
    },
    removeLocation: (state, action) => {
      state.footer.locations.splice(action.payload, 1);
    },
    addQuickLink: (state, action) => {
      state.footer.quickLinks.push(action.payload);
    },
    updateQuickLink: (state, action) => {
      const { index, field, value } = action.payload;
      state.footer.quickLinks[index][field] = value;
    },
    removeQuickLink: (state, action) => {
      state.footer.quickLinks.splice(action.payload, 1);
    },
  },
});

export const {
  handleBody1,
  handleHead1,
  handleImg1,
  handleImg2,
  handleLogo,
  handleOrganization,
  handleTitle,
  handleDate,
  handleTime,
  handleWhere,
  handleForm,
  handleFeatures,
  handleFeatureHead,
  handleFeatureBody,
  handleFeaturesTitle,
  handleImg1Url,
  handleImg2Url,
  handleLogoUrl,
  handlePrimaryColor,
  handleSecondaryColor,
  handleAccentColor,
  handleTextColor,
  updateCompanyInfo,
  updateSocialLink,
  updateContactInfo,
  addLocation,
  updateLocation,
  removeLocation,
  addQuickLink,
  updateQuickLink,
  removeQuickLink,
} = editorData.actions;

export default editorData.reducer;
