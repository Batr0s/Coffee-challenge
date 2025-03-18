import { Coffee } from "@/context/domain/Coffee";

export default function formValidation(formData: Coffee) {

        let newErrors: { 
            name?: string; 
            variety?: string; 
            price?: string; 
            description?: string; 
        } = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length > 30) {
            newErrors.name = "Name must be 30 characters or less";
        } else {
            delete newErrors.name;
        }
    
        if (!formData.variety) {
            newErrors.variety = "Please select a variety";
        } else {
            delete newErrors.variety;
        }
    
        if (formData.price < 0) {
            newErrors.price = "Can't be negative";
        } else if (!/^\d{1,3}(\.\d{2})?$/.test(String(formData.price))) {
            newErrors.price = "Price must be a number with up to 3 digits and 2 decimals";
        } else {
            delete newErrors.price;
        }
    
        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        } else if (formData.description.trim().length > 50) {
            newErrors.description = "Description must be 50 characters or less";
        } else {
            delete newErrors.description;
        }

        return newErrors;
}