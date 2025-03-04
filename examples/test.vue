<!-- src/components/UserList.vue -->

<template>
    <div>
        <h1>Users List</h1>
        <ul>
            <li v-for="user in users" :key="user.id">{{ user.name }} ({{ user.email }})</li>
        </ul>
        <p v-if="loading">Loading...</p>
        <p v-if="error">Error: {{ error.message }}</p>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { useQuery, gql } from "@apollo/client/vue";

export default defineComponent({
    name: "UserList",

    setup() {
        // ---------------------- 1 GraphQL статический запрос

        const GET_USERS = gql`
            query {
                users {
                    id
                    name
                    email
                }
            }
        `;

        // Используем хук useQuery для выполнения запроса
        const { loading, error, data } = useQuery(GET_USERS);

        // ---------------------- 2 переменные GraphQL

        const GET_USERS = gql`
            query GetUsers($limit: Int) {
                users(limit: $limit) {
                    id
                    name
                    email
                }
            }
        `;

        const { loading, error, data } = useQuery(GET_USERS, { variables: { limit: 10 } });

        // ---------------------- 3 переменные GraphQL

        const getUsersQuery = (fields = ["id", "name", "email"]) => gql`
                query {
                    users {
                        ${fields.join("\n")}
                    }
                }
            `;

        const GET_USERS = getUsersQuery(["id", "name"]); // Можно передавать динамические поля

        // Используем хук useQuery для выполнения запроса
        const { loading, error, data } = useQuery(GET_USERS);

        // ---------------------- 4 Использование директив (@include, @skip)

        const GET_USERS = gql`
            query GetUsers($withEmail: Boolean!) {
                users {
                    id
                    name
                    email @include(if: $withEmail)
                }
            }
        `;

        const { loading, error, data } = useQuery(GET_USERS, {
            variables: { withEmail: false }, // Если false, email не будет запрошен
        });

        // ----------------------

        return {
            loading,
            error,
            users: data ? data.users : [],
        };
    },
});
</script>

<style scoped>
/* Здесь могут быть стили компонента */
</style>
