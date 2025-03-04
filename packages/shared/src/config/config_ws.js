export default {
    wsServer: {
        port: 8081,
    },

    /** ping time | бездействие 10 мин? === разрыв */
    pingIntervalMS: {
        public: 480_000, // 480_000 ms === m8
        private: 60_000, // 60_000 ms === m1
    },
};
