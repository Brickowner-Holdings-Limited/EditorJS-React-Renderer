import TabOutput from './index';

// this test going to fail
describe('TabOutput renderer:', () => {
	const paragraphOutput = shallow(<TabOutput />);

	it('should match snapshot', () => expect(paragraphOutput).toMatchSnapshot());
});
