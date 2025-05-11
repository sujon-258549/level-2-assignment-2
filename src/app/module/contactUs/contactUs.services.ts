import Contact from './contactUs.model';
import { IContact } from './contactUs.interface';
import QueryBuilder from '../../builder/builder';

const createContactIntoDB = async (userData: IContact) => {
  const newContact = await Contact.create(userData); // Changed variable name for clarity
  return newContact;
};
const contactForMeIntoDB = async (query: Record<string, unknown>) => {
  const newUser = new QueryBuilder(Contact.find(), query)
    .sort()
    .fields()
    .filter()
    .search(['name', 'email', 'address', 'phone']);
  const meta = await newUser.countTotal();
  const data = await newUser.modelQuery;

  return { meta, data };
};
const singleContactIntoDB = async (id: string) => {
  const newUser = await Contact.findById(id);
  return newUser;
};

export const contactServices = {
  createContactIntoDB,
  contactForMeIntoDB,
  singleContactIntoDB,
};
