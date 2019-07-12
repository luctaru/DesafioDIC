using DICs_API.Helpers;
using DICs_API.Models;
using DICs_API.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DICs_API.Services
{
    public interface IUserService
    {
        Users Authenticate(string username, string password);
        IEnumerable<Users> GetAll();
        Users GetById(int id);
        bool Create(UsersUpload user);
        bool Update(UsersUpload user);
        void Delete(int id);
    }

    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly UsersRepository _repoUsers;

        public UserService(IOptions<AppSettings> appSettings, IConfiguration configuration)
        {
            _appSettings = appSettings.Value;
            _repoUsers = new UsersRepository(configuration);
        }

        public Users Authenticate(string useremail, string password)
        {
            if (string.IsNullOrEmpty(useremail) || string.IsNullOrEmpty(password))
                return null;
            var user = _repoUsers.GetForAuth(useremail);
            if (user == null)
                return null;
            var bytesHash = System.Convert.FromBase64String(user.PasswordHash);
            var bytesSalt = System.Convert.FromBase64String(user.PasswordSalt);
            if (!VerifyPasswordHash(password, bytesHash, bytesSalt))
                return null;
            return _repoUsers.Get(user.Id);
        }

        public bool Create(UsersUpload user)
        {
            if (string.IsNullOrWhiteSpace(user.Password))
                throw new Exception("Senha é obrigatória.");
            List<Users> users = _repoUsers.GetAll().ToList();
            if (users.Any(x => x.Email == user.Email))
                throw new Exception("Este email já está cadastrado.");
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(user.Password, out passwordHash, out passwordSalt);
            var userDto = user.ToUserDto();
            userDto.PasswordHash = System.Convert.ToBase64String(passwordHash);
            userDto.PasswordSalt = System.Convert.ToBase64String(passwordSalt);

            var result = _repoUsers.Insert(userDto);
            return result;
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Users> GetAll()
        {
            throw new NotImplementedException();
        }

        public Users GetById(int id)
        {
            return _repoUsers.Get(id);
        }

        public bool Update(UsersUpload user)
        {
            bool result;
            if (string.IsNullOrWhiteSpace(user.Password))
            {
                result = _repoUsers.Update(user);
                return result;
            }
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(user.Password, out passwordHash, out passwordSalt);
            var userDto = user.ToUserDto();
            userDto.PasswordHash = System.Convert.ToBase64String(passwordHash);
            userDto.PasswordSalt = System.Convert.ToBase64String(passwordSalt);

            result = _repoUsers.Update(userDto);

            return result;
        }
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Valor não pode ser nulo.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Valor não pode ser vazio.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}
