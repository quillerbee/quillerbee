import * as yup from "yup";

function wordLimit(limit, message) {
	return this.test("wordLimit", message, function (value) {
		const { path, createError } = this;

		return (
			value.match(/\w+/g)?.length <= limit ||
			createError({ path, message })
		);
	});
}

const addCustomMethodsToYup = () => {
	yup.addMethod(yup.mixed, "wordLimit", wordLimit);
};

export default addCustomMethodsToYup;
