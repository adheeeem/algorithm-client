import React, { useState } from 'react';
import { Student, School } from '@/types/api';
import { useSchools } from '@/features/dashboard/api/getters';
import { useNavigate } from 'react-router-dom';
import { useCreateStudent } from '@/features/dashboard/api/create-student';
import { isErrorResponse } from '@/lib/utils';

const AdminNewStudent: React.FC = () => {
    const navigate = useNavigate();
    const { data: schoolsData, isLoading: isSchoolsLoading, isError: isSchoolError, error: schoolError } = useSchools();
    const [newStudent, setNewStudent] = useState<Partial<Student>>({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        phone: '',
        grade: 1,
        schoolId: 0,
        email: '',
        dateOfBirth: '', // Store as string initially
        gender: 0
    });
    const createStudentMutation = useCreateStudent();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewStudent(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const studentData: Omit<Student, 'id'> = {
                firstname: newStudent.firstname!,
                lastname: newStudent.lastname!,
                username: newStudent.username!,
                password: newStudent.password!,
                phone: newStudent.phone!,
                email: newStudent.email!,
                dateOfBirth: new Date(newStudent.dateOfBirth!).toISOString(),
                gender: Number(newStudent.gender),
                schoolId: Number(newStudent.schoolId),
                grade: Number(newStudent.grade)
            };
            var response =await createStudentMutation.mutateAsync(studentData);
            if (isErrorResponse(response)) {
                alert(response.message);
            } else {
                alert('Student added successfully');
            }
            // Reset form or redirect
        } catch (error) {
            alert('Error adding student');
        }
    };
    if (isSchoolsLoading) {
        return <div>Loading...</div>;
    }

    if (isSchoolError) {
        // Check if the error is due to authentication
        if (schoolError instanceof Error && schoolError.message === 'No access token found') {
            navigate('/login');
            return null;
        }
        return <div>Error loading schools. Please try again later.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Student</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="firstname" className="block mb-1">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={newStudent.firstname}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastname" className="block mb-1">Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={newStudent.lastname}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="username" className="block mb-1">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={newStudent.username}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={newStudent.password}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-1">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={newStudent.phone}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="grade" className="block mb-1">Grade</label>
                    <input
                        type="number"
                        id="grade"
                        name="grade"
                        value={newStudent.grade}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                        min="1"
                        max="12"
                    />
                </div>
                <div>
                    <label htmlFor="schoolId" className="block mb-1">School</label>
                    <select
                        id="schoolId"
                        name="schoolId"
                        value={newStudent.schoolId}
                        onChange={handleInputChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select a school</option>
                        {schoolsData?.items.map((school: School) => (
                            <option key={school.id} value={school.id}>
                                {school.name} - {school.city}, {school.region}, {school.country}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={newStudent.email}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label htmlFor="dateOfBirth" className="block mb-1">Date of Birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={newStudent.dateOfBirth as string}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="gender" className="block mb-1">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={newStudent.gender}
                        onChange={handleInputChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                    </select>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={createStudentMutation.isLoading}
                >
                    {createStudentMutation.isLoading ? 'Adding Student...' : 'Add Student'}
                </button>
            </form>
        </div>
    );
};

export default AdminNewStudent;
