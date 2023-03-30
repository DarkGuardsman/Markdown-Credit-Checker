//Original console
const originalConsoleError = console.error;


/**
 * Mocks console
 * @return {void}
 */
export function mockConsoleError() {
    console.error = jest.fn();
}

/**
 * Clear mocks and restores console to original state
 * @return {void}
 */
export function unmockConsoleError() {
    console.error = originalConsoleError;
}

/**
 * Checks that no error were posted to mock console.error
 * @return {void}
 */
export function validateZeroErrors() {
    consoleErrorsMatches([]);
}

/**
 * Checks that error console matches input
 * @param {Array.<Array.<Any>>} input - array
 * @return {void}
 */
export function consoleErrorsMatches(input) {
    expect(console.error.mock.calls).toEqual(input);
}

