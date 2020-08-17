export const natsWrapper = {
    client: {
        publish: jest
            .fn() // returns the mock publish function
            .mockImplementation(
                (subject: string, data: string, callback: () => void) => {
                    callback();
                }
            )
    }
};
