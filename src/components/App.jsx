import { Component } from 'react';
import { nanoid } from 'nanoid';
import initialContacts from '../contacts.json';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { GlobalStyle } from '../components/GlobalStyle';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  handleFilter = evt => {
    this.setState({
      filter: evt.target.value,
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(item => item.id !== contactId),
      };
    });
  };

  addContact = newContact => {
    const { contacts } = this.state;
    const checkContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (checkContact) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    const contact = { ...newContact, id: nanoid() };
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, contact] };
    });
  };

  filteredList = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filteredList();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm updateContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onUpdateFilter={this.handleFilter} />
        {filteredContacts.length > 0 && (
          <ContactList items={filteredContacts} onDelete={this.deleteContact} />
        )}
        <GlobalStyle />
      </Container>
    );
  }
}
