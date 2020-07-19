<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="/Artboard.svg"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start"> 
            <b-navbar-item :to="{ path: '/' }">
                Home
            </b-navbar-item>
            <b-navbar-item :to="{ path : '/documentation'}">
                Documentation
            </b-navbar-item>
            <b-navbar-dropdown label="Utilities">
                <b-navbar-item :to="{ path: '/' }">
                    Excel to JSON Converter
                </b-navbar-item>
                <b-navbar-item href="#">
                    Coming Soon
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <!-- <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template> -->
    </b-navbar>
</template>