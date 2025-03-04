import { faker } from "@faker-js/faker";

const mockRandomData = {
    User: () => ({
        id: () => faker.string.uuid(),
        name: () => faker.person.fullName(),
        email: () => faker.internet.email(),
        age: () => faker.number.int({ min: 18, max: 80 }),
    }),
};

const mockStaticData = {
    User: () => ({
        id: () => "12345",
        name: () => "John Doe",
        email: () => "johndoe@example.com",
        age: () => 30,
    }),
};

export { mockRandomData, mockStaticData };
