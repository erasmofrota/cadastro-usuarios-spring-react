let mockPeople = [
    { id: 1, name: 'João' },
    { id: 2, name: 'Maria' },
    { id: 3, name: 'Pedro' },
  ];
  
  export const fetchPeople = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPeople);
      }, 500);
    });
  };
  
  export const addPerson = (person) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPerson = { ...person, id: mockPeople.length + 1 };
        mockPeople = [...mockPeople, newPerson];
        resolve(newPerson);
      }, 500);
    });
  };
  
  export const deletePerson = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockPeople = mockPeople.filter((person) => person.id !== id);
        resolve(id);
      }, 500);
    });
  };
  