import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ApiRequest, { url } from './apiRequest.jsx';

describe('Función ApiRequest', () => {
    let mockAxios;
    let urlString = url
    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.reset();
    });

    it('Debería hacer una solicitud GET exitosa con los encabezados adecuados', async () => {
        const responseData = {
            data: {
                "id": 1,
                "email": 'testFake@mail.com',
                "role": "admin"
            }
        };
        const url = `${urlString}/users`;
        const method = 'GET';

        mockAxios.onGet(url).reply(200, responseData);

        const response = await ApiRequest({ url, method });

        expect(response.status).toBe(200);
        expect(response.data).toEqual(responseData);
    });

    it('Debería hacer una solicitud POST exitosa con los encabezados y cuerpo adecuados', async () => {
        const bodyRequest = {
            email: 'testFake@mail.com',
            password: "123456",
            role: "admin"
        };
        const responseData = {
            data: {
                id: 1,
                email: 'testFake@mail.com',
                password: "123456",
                role: "admin"
            }
        };
        const url = `${urlString}/users`;
        const method = 'POST';

        mockAxios.onPost(url).reply(200, responseData);

        const response = await ApiRequest({ url, method, body: bodyRequest });

        expect(response.status).toBe(200);
        expect(response.data).toEqual(responseData);
    });

    it('Debería manejar respuestas de error', async () => {
        const url = `${urlString}/users`;
        const method = 'GET';

        mockAxios.onGet(url).reply(401, {
            message: {
                "error": "string"
            }
        });

        try {
            await ApiRequest({ url, method });
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data).toEqual({
                message: {
                    "error": "string"
                }
            });
        }
    });
});
